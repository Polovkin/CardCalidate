(function () {
        function GetCardType(number)
        {
            let re = new RegExp("^4");
            if (number.match(re) != null)
                return "visa";

            if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
                return "mastercard";

            return "white";
        }

        function luhnAlgorithm(digits) {
            let sum = 0;

            for (let i = 0; i < digits.length; i++) {
                let cardNum = parseInt(digits[i]);

                if ((digits.length - i) % 2 === 0) {
                    cardNum = cardNum * 2;

                    if (cardNum > 9) {
                        cardNum = cardNum - 9;
                    }
                }

                sum += cardNum;
            }

            return sum % 10 === 0;
        }

        function onlyNumber(input) {
            input.value = input.value.replace(/[^\d]/g, '');
        }

        function checkData(date) {
            let d = new Date();
            let currentYear = d.getFullYear();
            let currentMonth = d.getMonth() + 1;
            let parts = date.split('/');
            let year = parseInt(parts[1], 10) + 2000;
            let month = parseInt(parts[0], 10);

            return (year < currentYear || (year === currentYear && month < currentMonth))
        }

        function errorMsg(input, msg) {
            let error = input.parentElement.querySelector('.error')
            input.classList.add('invalid')
            error.innerHTML = msg;
        }

        const form = document.querySelector('form')
        const inputNumber = form.querySelector('input[name="cardNumber"]')
        const inputDate = form.querySelector('input[name="cardDate"]')
        let label = form.querySelectorAll('label')

        for (let i = 0; i < label.length; i++) {
            const errorMsg = label[i].querySelector('.error')
            const input = label[i].querySelector('input')
            if (input) {
                input.addEventListener('invalid', function (event) {
                    event.preventDefault();
                    if (!event.target.validity.valid) {
                        errorMsg.style.opacity = '1';
                        setTimeout(function () {
                            errorMsg.style.opacity = '0';
                        }, 5000)
                    } else {
                        errorMsg.style.opacity = '0';
                    }
                })
            }
        }

        inputNumber.addEventListener('keyup', (e) => {
            onlyNumber(inputNumber)

            let value = inputNumber.value.split(" ").join("");
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(" ");
            }
            let icon = document.querySelector('.icon')
            console.log(icon);


            icon.style.opacity = `1`
            icon.src = `/assets/img/icons/${GetCardType(value.replace(/\s/g, ''))}.svg`
            inputNumber.value = value
            if (luhnAlgorithm(value.replace(/\s/g, ''))) {
                inputNumber.classList.remove('invalid');
            }

        })

        inputDate.addEventListener('keyup', (e) => {
            onlyNumber(inputDate);
            let value = inputDate.value.split(" ").join("");
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,2}', 'g')).join("/");
            }
            inputDate.value = value;
            if (!checkData(inputDate.value)) {
                inputDate.classList.remove('invalid');
            }
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let loader = document.querySelector('.lds-ring');
            let button = document.querySelector('button[type="submit"]');
            let validDate = false;
            let validNumber = false;


            if (checkData(inputDate.value)) {
                inputDate.classList.add('invalid');
                errorMsg(inputDate,'Срок карты недействителен')
            } else {
                validDate = true
            }
            if (!luhnAlgorithm(inputNumber.value.replace(/\s/g, ''))) {
                inputNumber.classList.add('invalid');
                errorMsg(inputNumber,'Некорректный номер карты')
            } else {
                validNumber = true;
            }
            if (validDate && validNumber) {
                loader.classList.add('show');
                button.classList.add('disable');
                let inputs = document.querySelectorAll('input');
                for (let j = 0; j < inputs.length; j++) {
                    inputs[j].classList.remove('invalid')
                }
                setTimeout(()=>{
                    button.classList.remove('disable');
                    loader.classList.remove('show');
                    alert('valid')
                },2000)


                //send dta
            }
        })


    }
    ()
);
//5168 7450 1005 4622
