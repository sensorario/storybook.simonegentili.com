import type { Meta, StoryObj } from '@storybook/react-vite';
import './Table.css';

const meta: Meta = {
    title: 'Components/Table',
};

export default meta;

export const Default: StoryObj = {
    render: () => (
        <div className="sg-table-scroll">
            <table className="sg-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Giornate</th>
                        <th className="sg-table-num">Ore</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Acme</td><td>4</td><td className="sg-table-num">28,5</td></tr>
                    <tr><td>Globex</td><td>2</td><td className="sg-table-num">12</td></tr>
                    <tr><td>Initech</td><td>7</td><td className="sg-table-num">51,25</td></tr>
                </tbody>
            </table>
        </div>
    ),
};
