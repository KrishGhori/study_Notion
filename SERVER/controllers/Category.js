const Categorys = require("../models/Categorys");
const Category = require("../models/Categorys")

exports.createCategory = async (req,res)=>{
    
    try{

        const {name , description} = req.body ;

        if(!name || !description){
            return res.status(400).json({
                success : false ,
                message : "All fields are require"
            })
        }

    // create antry in db
    const CategoryDetails = await Category.create({
        name : name ,
        description : description 
    })
    console.log(CategoryDetails)

    return res.status(200).json({
        success :true ,
        message : "create tag successfully"
    })
    }catch(error){
        console.error(error)
         res.status(500).json({
            success : false ,
            message : error.message
         })
    }
}


// getallTag
exports.showAllCategorys = async (req,res)=>{
    try{

        const allCategory = await Category.find({}, { name: true, description: true })

        res.status(200).json({
            success : true ,
            message : "All tags return successfully" ,
            allCategory
        })

    } catch(error) {
        console.error(error)
        res.status(500).json({
            success : false ,
            message : error.message
         })
    }
}


// category page Details
exports.CategoryPageDetails = async (req,res) => {
    try{

        const {categoryId} = req.body ;

        const selectedCategorys = await Category.findById(categoryId)
                                                .populate("course")
                                                .exec() ;
                            
        if(!selectedCategorys){
            return res.status(404).json({
                succcess : false ,
                message : "categorys not found" ,
                error : error.message
            })
        }
        
        if(!selectedCategorys.length === 0 ){
            return res.status(404).json({
                success : false ,
                message : "no category found for the selected category"
            })
        }

        const differnetcategory = await Category.findById({
                                                        _id : {$ne : categoryId} ,
                                                    })
                                                    .populate("course")
                                                    .exec();
        //  get top selling courses 
        const topSellingCourses = await Course.aggregate([{
                                                    $addFields: {
                                                        totalStudents: { $size: "$studentEnrolled" }
                                                    }},
                                                    {$sort: { totalStudents: -1 }},
                                                    {$limit: 5}
                                                ]);

        
        return res.status(200).json({
            success : true ,
            data : {
                differnetcategory ,
                selectedCategorys ,
                topSellingCourses
            }
         })

    }catch(error){
        console.error(error)
        return res.status(500).json({
            success : false ,
            message : error.message
         })
    }
}