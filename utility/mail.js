const nodemailer=require('nodemailer')

const mail=async({from,to,subject,text,html})=>{
  const transport=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  })

  await transport.sendMail({
    from:from,
    to:to,
    subject:subject,
    text:text,
    html:html
  })

  return
}

module.exports=mail