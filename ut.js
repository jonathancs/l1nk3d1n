let p = new Promise((resolve, reject) => {

  for (i = 0; i < 1000; i++) {
    console.log([i])
    
  }

  if (i == 1000) {
    Resolve("Success");
  } else {
    reject("Failed");
  }
});

p
 .then(() => {console.log("deu?");console.log(i)})
 .catch(() => {console.log("deu erro");console.log(i)})

 