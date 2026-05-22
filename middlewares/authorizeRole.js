exports.adminOnly = async (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }



        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admins only"
            })
        }



        next()

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}







exports.sellersOnly = async (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }



        if (req.user.role !== "seller") {
            return res.status(403).json({
                success: false,
                message: "Sellers only"
            })
        }



        next()

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}