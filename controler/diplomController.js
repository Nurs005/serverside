const Diplom = require('../models/Diplom');
const User = require('../models/User');
const diplomsBascket = require('../models/diplomsBascket');
const UserBasket = require('../models/userBasket')
const DiplomsBasket = require('../models/diplomsBascket');

class DiplomsController {
    async create(req, res) {
        try {
            const metadata = req.ipfsImage
            if (!metadata) {
                return res.status(404).json({ message: 'metadata is required' })
            }
            const diplom = new Diplom({ metadata })
            await diplom.save()
            if (!req.user) {
                return res.status(400).json({ message: 'user is not found' })
            }
            const diplomsBascket = new DiplomsBasket({
                userdiplomsid: req.user,
                diplomid: diplom._id,
            })
            await diplomsBascket.save()
            return res.json("Диплом создан")
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
    async getUserDiploms(req, res, next) {
        try {
            if (req.user) {
                const diplomsid = await DiplomsBasket.find({ userdiplomsid: req.user });
                const parsedDiploms = diplomsid.map(diplom => ({
                    diplomId: diplom.diplomid
                }));
                const userBasket = await UserBasket.findOne({ _id: req.user });
                const userNameaccess = userBasket.userid
                const user = await User.findOne({ _id: userNameaccess });
                const diploms = await Diplom.find({
                    _id: { $in: parsedDiploms.map(diplom => diplom.diplomId) }
                });
                const parseMetadata = diploms.map(d => d.metadata);
                parseMetadata.unshift({ name: `${user.userName}` });
                // req.metadata = parseMetadata
                // next()
                return res.json(parseMetadata)
            }
            return res.status(404).json("Пользователя не существует.")
        } catch (e) {
            return res.status(400).json({ message: 'Ошибка при получении дипломов' });
        }
    }
}

module.exports = new DiplomsController()