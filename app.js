const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const blogRoutes=require("./routes/blogRoutes");
// Express app
const app=express();

// View engine
app.set("view engine", "ejs");

// If you are using a different folder instead of one named views
// app.set("views", "myviews")
// Listen to a port
mongoose.connect("mongodb://localhost/anotherblog")
.then(()=>{
    app.listen(3200) ;
})
.catch((err)=>console.log(err));


// Middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
// Routes
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    res.redirect("/blogs");
});

app.get("/about",(req,res)=>{
    // res.send("<h1>About page</h1>");
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", {title:"About page"});
});


// Blog routes
app.use("/blogs",blogRoutes);



app.get("/test",(req,res)=>{
    res.render("test", {title:"Test page"});
});


app.use((req,res)=>{
    // res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404", {title:"404 error"});
});