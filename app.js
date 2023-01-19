require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
// const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mailchimp.setConfig({                  //configuring mailchimp api
  apiKey: process.env.APIKEY,
  server: "us10",
});



const sendmail = async () => {
    const response = await mailchimp.messages?.sendTemplate({
      template_name: "Sample Template3",
      template_content: [{
        name : "",
        content : ""
      }],
      message: {
        subject : "Sample Subject",
        text : "This is the sample text",
        from_email : "test12@gmail.com",
        to : [{
            email : "shreyashidabral543@gmail.com", 
            name : "Shreyashi",
            type : "to"
        }],
        important : true,
        auto_text : true,
        auto_html : true,
      }
    });

    console.log(response);
};

sendmail();

const createtemplate = async () => {
    const response = await mailchimp.templates.create({
      name: "Sample Template3",
      html: `<p>Hello, *|FNAME|* here's your newsletter.</p>`,
    });
    console.log(response);
};

const createcampaign = async () => {
    const response = await mailchimp.campaigns.create({
        type:"plaintext",
        recipients: {
            list_id:`${process.env.listID}`
        },
        settings:{
            subject_line:"Test Subject",
            title:"Sample Title",
            from_name:"Shreyashi",
            reply_to:"noreply@mydomain.com",
            // template_id:"11097817"
        },
        content_type:"template"
    });
    console.log(response);
};

const run = async () => {
    const response = await mailchimp.templates.list();
    console.log(response);
};

  
// run();

app.listen(4000, () => {
    console.log("Server started at port 4000");
})