import YAML from 'yaml';

export function downloadYaml(filename: string, data: unknown) {
    try {
        const content = YAML.stringify(data);
        const blob = new Blob([content], { type: 'text/plain' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    } catch (error) {
        new Error('Error downloading file: ' + error);
    }
}
