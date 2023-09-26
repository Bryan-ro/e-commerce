import axios from "axios";
import { hash } from "bcrypt";


// (async () => {
//     console.log(await hash("Inicialacbb4", 15)); 
// })();

// const options1 = {
//     method: "POST",
//     url: "https://sandbox.asaas.com/api/v3/customers",
//     headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjU5NDY6OiRhYWNoXzUwZDY4ODg4LTVmNTItNDEyNS05ZjA3LTVmNGViYjExNDA3ZA=="
//     },
//     data: {
//         name: "Bryan Gomes Rocha",
//         email: "bryangomesrocha@gmail.com",
//         mobilePhone: "11960976085",
//         cpfCnpj: "24067935838",
//         postalCode: "04805190",
//         address: "R. Padre Lourenço Liebana",
//         addressNumber: "45",
//         province: "Recanto dos Sonhos"
//     }
// };
  
// axios.request(options1)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error.message);
//     });


// const options = {
//     method: "POST",
//     url: "https://sandbox.asaas.com/api/v3/creditCard/tokenize",
//     headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjU5NDY6OiRhYWNoXzUwZDY4ODg4LTVmNTItNDEyNS05ZjA3LTVmNGViYjExNDA3ZA=="
//     },
//     data: {
//         customer: "cus_000005439599",
//         creditCard: {
//             holderName: "Bryan Gomes Rocha",
//             number: "5334306219378829",
//             expiryMonth: "03",
//             expiryYear: "2024",
//             ccv: "312"
//         },
//         creditCardHolderInfo: {
//             name: "Bryan Gomes Rocha",
//             email: "bryangomesrocha@gmail.com",
//             cpfCnpj: "24067935838",
//             postalCode: "04805190",
//             addressNumber: "45",
//             addressComplement: null,
//             phone: "11960976085"
//         },
//         remoteIp: "116.213.42.532"
//     }
// };
  
// axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error.message);
//     });


const options = {
    method: "GET",
    url: "https://sandbox.asaas.com/api/v3/customers",
    headers: {
        accept: "application/json",
        access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjU5NDY6OiRhYWNoXzUwZDY4ODg4LTVmNTItNDEyNS05ZjA3LTVmNGViYjExNDA3ZA=="
    }
};
  
axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });


//cus_000005439599

// const options = {
//     method: "POST",
//     url: "https://sandbox.asaas.com/api/v3/payments/",
//     headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjU5NDY6OiRhYWNoXzUwZDY4ODg4LTVmNTItNDEyNS05ZjA3LTVmNGViYjExNDA3ZA=="
//     },
//     data: {
//         billingType: "CREDIT_CARD",
//         customer: "cus_000005439599",
//         dueDate: "2023-09-25",
//         value: 10,
//         description: "Pedido 056984",
//         externalReference: "016984",
//         creditCardToken: "740781ae-4c22-4b02-bbd5-7a3d4141c871",
//     }
// };


// const options = {
//     method: "POST",
//     url: "https://sandbox.asaas.com/api/v3/payments/pay_7396008110725249/payWithCreditCard",
//     headers: { 
//         accept: "application/json", 
//         "content-type": "application/json",
//         access_token: "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNjU5NDY6OiRhYWNoXzUwZDY4ODg4LTVmNTItNDEyNS05ZjA3LTVmNGViYjExNDA3ZA=="
//     },
//     data: {
//         creditCardToken: "740781ae-4c22-4b02-bbd5-7a3d4141c871",
//         creditCardHolderInfo: {
//             name: "Bryan Gomes Rocha",
//             email: "bryangomesrocha@gmail.com",
//             cpfCnpj: "24067935838",
//             postalCode: "04805190",
//             addressNumber: "45",
//             addressComplement: null,
//             phone: "11960976085"
//         }
//     }
// };
  

// axios.request(options)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.error(error.response.data);
//     });

// creditCardToken: '740781ae-4c22-4b02-bbd5-7a3d4141c871'
// pay_7396008110725249

