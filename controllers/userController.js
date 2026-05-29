
const {User, Profile, County,Category, Product} = require("../models")

exports.getSellerProfile = async (req,res) => {
    

    try {

        const seller = await User.findOne({
            where:{
                username:req.params.username
            },



            attributes:[
                "id",
                "username",
                "email"
            ],


            include:[


                {
                    model:Profile,
                    attributes:[
                        "id",
                        "bio",
                        "avatar_url"
                    ],

                    include:[
                        {
                            model:County,
                            attributes:["name"]
                        }
                    ]
                },

                {
                    model:Product,

                    include:[
                        {
                            model:Category,
                            attributes:["name"]
                        }


                    ]
                }


                
            ]

        })


        if(!seller){
            return res.status(404).json({
                success:false,
                message:"Seller not found"
            })


        }

        const totalProducts = seller.Product.length

        const dateJoined = new Date(seller.createdAt)

        const currentDate = new  Date()

        const diffTime = currentDate - dateJoined

        const diffDays = Math.floor(
            diffTime / (1000 * 60 * 60 * 24)
        )


        return res.status(200).json({
            success:true,
            seller:{
                id:seller.id,
                username:seller.user,
                joined:seller.createdAt,

            member_since:
               `${diffDays} days`,

            bio:
               seller.Profile?.bio,

            avatar_url:
               seller.Profile?.avatar_url,

            county:
               seller.Profile?.County?.name,

            total_products:
               totalProducts
            }
        })

        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}