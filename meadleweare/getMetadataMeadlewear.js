const fetch = require('node-fetch');

const getDataFromMetadata = async (req, res) => {
    try {
        if (!req.metadata) {
            return res.status(400).json('Не передан metadata');
        }

        const metadataArray = req.metadata;
        const metadataPromises = metadataArray.map(async (metadataUrl) => {
            const response = await fetch(metadataUrl);
            if (!response.ok) {
                throw new Error(`Ошибка при запросе к ${metadataUrl}`);
            }
            return response.json();
        });

        const metadataResults = await Promise.all(metadataPromises);
        return res.json(metadataResults);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = getDataFromMetadata;