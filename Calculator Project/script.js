let string="";
let buttons=document.querySelectorAll(".button");

Array.from(buttons).forEach((button)=>{
    button.addEventListener("click", (e)=>{
      if(e.target.value=="="){
        new_string1=string.split('/').reverse()[0];
        if(new_string1==string){
            string=string.replace("%","*0.01");
        }
        else{
            string=string.replaceAll("%","/0.01");
        }
        string=eval(string);
      }
      else if(e.target.value=="AC"){
        string="";
      }
      else if(e.target.value=="Del"){
        string=string.substring(0,string.length-1);
      }
      else if(e.target.value=="+/-"){
        new_string1=string.split('+').reverse()[0];
        new_string2=new_string1.split('-').reverse()[0];
        new_string3=new_string2.split('*').reverse()[0];
        new_string4=new_string3.split('/').reverse()[0];
        string=string.replace(new_string4,"(-"+new_string4+")");
      }
      else if(e.target.value=="+" || e.target.value=="-" || e.target.value=="*" || e.target.value=="/"){
        if(string[string.length-1]=="+" || string[string.length-1]=="-" || string[string.length-1]=="*" || string[string.length-1]=="/"){
            string=string.substring(0,string.length-1);
        }
        string +=e.target.value;
      }
      else{
          string = string + e.target.value;
      }
      document.querySelector("input").value = string;
  })
})
