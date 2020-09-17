let accountDetails = {//accountdetail is an obj of bank
    1001: { name: "user1", accno: 1001, pin: 2345, pswd: "userone", balance: 3000, transactions: []},//another obj
    1002: { name: "user2", accno: 1002, pin: 2445, pswd: "usertwo", balance: 3000 , transactions: []},
    1003: { name: "user3", accno: 1003, pin: 2343, pswd: "userthree", balance: 3000 , transactions: []},
    1004: { name: "user4", accno: 1004, pin: 2245, pswd: "userfour", balance: 3000 , transactions: []},
    1005: { name: "user5", accno: 1005, pin: 2355, pswd: "userfive", balance: 3000, transactions: [] }
  }
let currentUser;
 const register = (name, accno, pin, pswd)=> {
    if (accno in accountDetails) {
        return {
            status: false,
            statusCode: 422,
            Message: "Account is already exist. Please log in",
            // balance: data[accnum].balance
          }
      
    }
    accountDetails[accno] = {
      name,
      accno,
      pin,
      pswd,
      balance: 0,
      transactions: []
    }
    return {
        status: true,
        statusCode: 200,
        Message: "Account created successfuly. Please log in",
        // balance: data[accnum].balance
      }
  
  }


 const login = (accno, pswd) => {
    var accnum = parseInt(accno); //ngModule, here no as argument in login()
    var password1 = pswd;
    var data = accountDetails;

    if (accnum in data) {
      let pswd1 = data[accnum].pswd
      if (pswd1 == password1) {
        currentUser = data[accnum]
        //this.saveDetails()
        return {
            status: true,
            statusCode: 200,
            Message: "Logged in successfully"
            
          } 
      }
    }

        return {
            status: false,
            statusCode: 422,
            Message: "Incorrect credential"
            
          }  
    
  }

 const deposit = (accno, pin, amount) => {

    var accnum = parseInt(accno); 
    var userpin = pin;
    var useramount = parseInt(amount);
    var data = accountDetails;
    if (accnum in data) {
      let pin1 = data[accnum].pin
      if (pin1 == userpin) {
        data[accnum].balance += useramount
         data[accnum].transactions.push({
           amount:useramount,
          type:'Credit'
         })
                return {
          status: true,
          statusCode: 200,
          Message: 'Amount credited successfully.',
          balance: data[accnum].balance
        }
      }

      else {
        return {
          status: false,
          statusCode: 402,
          Message: 'Incorrect account details.',
          //  balance:data[accnum].balance
        }
      }
    }


  }

  const withdraw = (accno, pin, amount) =>{

    var accnum = parseInt(accno); //ngModule, here no as argument in login()
    var userpin = pin;
    var useramount = parseInt(amount);


    var data = accountDetails;

    if (accnum in data) {
      let pin1 = data[accnum].pin

      if (data[accnum].balance < useramount) {
        return {
          status: false,
          statusCode: 402,
          Message: 'Insufficient balance.',
          balance: data[accnum].balance
        }
      }

      else if (pin1 == userpin) {

        data[accnum].balance -= useramount
        data[accnum].transactions.push({
          amount:useramount,
          type:'Debit'
        })
        
        
        return {
          status: true,
          statusCode: 200,
          Message: 'Amount debited successfully.',
          balance: data[accnum].balance
        }
      }

      else {
        return {
          status: false,
          statusCode: 402,
          Message: 'Incorrect account details.',

        }
      }
    }
    else {
      return {
        status: false,
        statusCode: 402,
        Message: 'Incorrect account details.',

      }
    }
  }

  const  getTransaction =()=>{
    return accountDetails[currentUser.accno].transactions;
      }

  module.exports={
      register,
      login,
      deposit,
      withdraw,
      getTransaction
  }