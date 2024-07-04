function helloworld (y){
    console.log("hello world",y)
}

function namastey  (z){
    console.log("namastey",z)
}

function abc (x, callback){
    console.log(x);
    callback(2)
}

abc(1,namastey);