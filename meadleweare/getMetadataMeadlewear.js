const fetch = require('node-fetch');

const getDataFromMetadata = async (req, res) => {
    try {
        if (!req.metadata) {
            return res.status(400).json('Не передан metadata');
        }

        const metadataArray = req.metadata;
        const metadataPromises = metadataArray.map(async (metadataUrl, index) => {
            const response = await fetch(metadataUrl);
            if (!response.ok) {
                throw new Error(`Ошибка при запросе к ${metadataUrl}`);
            }
            const metadata = await response.json();

            const newData = metadata.map((item, index) => {
                const newItem = { ...item };
                delete newItem.name;
                return {
                    id: index + 1,
                    metadata: newItem
                };
            });
        });

        const metadataResults = await Promise.all(metadataPromises);
        return res.json(metadataResults);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports = getDataFromMetadata;