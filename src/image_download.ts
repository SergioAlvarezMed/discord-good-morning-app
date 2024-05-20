import axios from 'axios';

export async function downloadImage(): Promise<Buffer> {
    const url = 'https://pic.re/image';

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
    }
}
