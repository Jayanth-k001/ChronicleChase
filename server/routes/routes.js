const express = require('express');
const router = new express.Router();
const db = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const authenticate = require('../middleware/middleware')
const articledb=require("../model/articleSchema");


router.post('/register', async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword)
    res.status(422).json({ error: "enter all the details" });

  try {
    const preuser = await db.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "already registered with this email , plzzz login!!!" });
    }
    else if (password != cpassword)
      res.status(422).json({ error: "password doesn't match" });
    else {
      const user = new db({ name, email, password, cpassword });

      const newuserdata = await user.save();
      res.status(201).json({ status: 201, newuserdata })
    }
  }
  catch (error) {
    res.status(422).json(error);
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(422).json({ error: "enter all the details" });
  try {
    const userValid = await db.findOne({ email: email });

    if (userValid) 
    {

      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" })
      }
      else {
        const token = await userValid.generateAuthtoken();
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        });

        const result = {
          userValid,
          token
        }

        res.status(201).json({ status: 201, result,email })
      }
    } else {
      res.status(422).json({ error: "invalid details" })
    }

  } catch (error) {

  }

})

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await db.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => {
      return curr.token !== req.token
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201 })

  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
})

router.post('/save',async(req,res)=>{
  const {email, title, description, imageUrl, newsUrl, author, date, source}=req.body;
  const newArticle={title, description, imageUrl, newsUrl, author, date, source};
  try{

    let user_exist=await articledb.findOne({email:email});
    if(user_exist){
  const saved=await articledb.updateOne({email:email},{ $push: { articles: newArticle } });
  res.status(201).json({status: 201,message:"success"});}
  else{
    const new_user=new articledb({email,newArticle});
    await new_user.save();
    res.status(201).json({status: 201,message:"success"});
  }
  }catch(err){
    console.log(err);
  }
})


router.get('/saved/:email',async(req,res)=>{
  let saved_email=req.params.email;
  try{
  const savedArticles=await articledb.findOne({email:saved_email});
  res.json({status:201,savedArticles});
  }catch(error){
    console.log(error);
  }
})

router.post('/delete',async(req,res)=>{
  const {email, title, description, imageUrl, newsUrl, author, date, source}=req.body;
  try{
        const delete_article=await articledb.updateOne({email:email},{ $pull: { articles:{ title:title} } });
        res.json({status:201,delete_article});
        console.log(delete_article);
  }catch(error){
    console.log(error);
  }
})

module.exports = router;