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
        const flattenedData = metadataResults.flatMap(({ attributes, ...rest }) => {
            const restWithAttributes = [rest];
            if (attributes) {
                restWithAttributes.push(...attributes);
            }
            return restWithAttributes;
        });
        return res.json(flattenedData);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = getDataFromMetadata;