{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs@{ self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          devShells = {
            default = with pkgs;
              mkShell {
                buildInputs = [
                  bun
                  # Easy to bootstrap. Dashboard is great to visually demonstrate "behind the scenes" of various approaches.
                  supabase-cli
                  # only needed for specific cases where execute targets "npx" of some packages do not support bun yet.
                  nodejs_22
                  zsh
                ];
              };
            # shellHooks = ''
            #   ${pkgs.zsh}/bin/zsh
            # '';
          };

          packages =
            let
              src = ./.;
              node_modules =
                pkgs.stdenv.mkDerivation {
                  name = "lab-node_modules";
                  impureEnvVars = pkgs.lib.fetchers.proxyImpureEnvVars
                    ++ [ "GIT_PROXY_COMMAND" "SOCKS_SERVER" ];

                  nativeBuildInputs = [ pkgs.bun pkgs.nodejs_22 ];
                  inherit src;
                  dontConfigure = true;
                  buildPhase = ''
                    mkdir -p $out/dist
                      cd ./storybook
                      ${pkgs.bun}/bin/bun install --no-save --production --ignore-scripts
                      ${pkgs.bun}/bin/bun storybook build
                  '';
                  installPhase = ''
                    mkdir -p $out
                    cp -R ./storybook $out
                  '';

                  outputHash = "sha256-Vnu8+jnSlOsCPIiYmiaaU8pzos2TqT5IJRZjpRVBO+0=";
                  outputHashAlgo = "sha256";
                  outputHashMode = "recursive";

                };
            in
            {
              lab-storybook =
                pkgs.stdenv.mkDerivation {
                  name = "storybook";
                  version = "0.0.1";
                  src = ./.;
                  nativeBuildInputs = [ node_modules ];

                  dontConfigure = true;

                  installPhase = ''
                    runHook preInstall
                    mkdir -p $out
                    cp -R ${node_modules} $out
                    runHook postInstall
                  '';


                };
            };

          apps = { };
          formatter = pkgs.nixpkgs-fmt;
        });
}
