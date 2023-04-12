import { RequestHandler } from "express";
import { LangugeModel } from "../../models/language.model";
import { imageUploader } from "../../uploads/cloudinary.uploads"



// get all language category

export const getAllLanguage:RequestHandler= async (req,res)=>{
    try{
        const lang=await LangugeModel.find()
        
        res
        .send({staus:true,lang})
    }catch(error){
        console.log(error);
        
    }
}



//add Language
export const addLanguage: RequestHandler = async (req, res) => {
    try {
        console.log(req.body);
        const language=req.body.language
        const ImageUrl=req.body.imageUrl
        
        console.log(language);
        console.log(language,ImageUrl);
        const existProgram=await LangugeModel.findOne({language:language})
        if(existProgram){
            res
            .send({status:false,msg:`the ${language} program is Already finds`})
        }
        else{
            console.log("hiii");
            await new LangugeModel({ language: language,
                imageUrl:ImageUrl })
            .save()
            .then((cat)=>{
                res
                .send({status:true,msg:`the ${cat.language} program is added`})
            })
        }
    } catch (err) {
        console.log(err);
        
    }
  };

  // delete Language
  export const deleteLanguage:RequestHandler=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        
        await LangugeModel.findByIdAndDelete({_id:id})
        .then((program)=>{
            res
            .send({staus:true,msg:`The ${program?.language} is removed from the Program`})
        })
       

    }catch(error){

    }
  }


