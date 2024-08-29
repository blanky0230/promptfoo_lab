import type { Meta, StoryObj } from '@storybook/react';

import { Layout } from '@/Layout';
import { Welcome } from '../Welcome';

const meta: Meta<typeof Welcome> = {
    component: Welcome,
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const FirstRun: Story = {
    decorators: [
        (Story) => (
            <Layout>
                <Story />
            </Layout>
        ),
    ],
    // play: async () => {},
};
