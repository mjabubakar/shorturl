const { User, Url } = require("../models");
const dns = require("dns");

exports.allUrls = async (req, res, next) => {

    if (!req.email) {
        const error = new Error("Not authenticated");
        error.code = 401;
        return next(error);
    }

    const user = await User.findOne({ where: { email: req.email } });

    if (!user) {
        const error = new Error("Not authorized.");
        error.code = 403;
        throw error;
    }

    const allUrls = await Url.findAll({
        where: { userId: user.id },
        attributes: ["url", "customUrl"]
    });

    res.status(200).json(allUrls);
}

exports.redirect = async (req, res, next) => {
    const { customUrl } = req.params;

    const url = await Url.findOne({
        where: { customUrl },
        attributes: ["url"]
    });

    if (!url) {
        const error = new Error("Page not found");
        error.code = 404;
        return next(error);
    }
    res.status(200).json(url.url);
}

exports.add = async (req, res, next) => {

    if (!req.email) {
        const error = new Error("Not authenticated");
        error.code = 401;
        return next(error);
    }

    const user = await User.findOne({ where: { email: req.email } });

    if (!user) {
        const error = new Error("Not authorized.");
        error.code = 403;
        throw error;
    }

    const { url, customUrl } = req.body;

    if (customUrl.length < 4) {
        const error = new Error("Custom URL too short.");
        error.code = 422;
        return next(error);
    }

    await new Promise(() => {
        dns.lookup(url, (error) => {
            if (error) {
                const error = new Error("Invalid URL.");
                error.code = 422;
                return next(error);
            }

            Url.findOne({ where: { customUrl } })
                .then(urlExist => {

                    if (urlExist) {
                        const error = new Error("Custom URL already taken");
                        error.code = 409;
                        return next(error);
                    }
                    Url.create({
                        url,
                        customUrl,
                        userId: user.id
                    }).then(newUrl => {
                        res.status(200).json(newUrl);
                    });
                });
        });
    });
}