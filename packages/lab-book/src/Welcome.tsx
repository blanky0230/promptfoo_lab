import banner from '@/assets/banner.webp';

export function Welcome() {
    return (
        <div>
            <h1>Automatisieres Testen von KI-Agenten</h1>
            <img
                style={{
                    width: '100%',
                }}
                src={banner}
                alt="banner"
            />
            <a
                href="https://www.promptfoo.dev/docs/intro/"
                target="_blank"
                rel="noreferrer"
            >
                <h2>Promptfoo</h2>
            </a>
            <br />
            <p>KI-Anwendungen genauso testen - wie wir es sonst auch machen!</p>
        </div>
    );
}
