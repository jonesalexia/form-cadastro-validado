class ValidateForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.validField();
        const validPassword = this.validPasswords();
    }

    validPasswords() {
        let valid = true;

        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');

        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campos sennha e repetir senha precisam ser iguais.');
            this.createErrorr(repeatPassword, 'Campos sennha e repetir senha precisam ser iguais.');
        }

        if(password.value.lenght < 6 || password.value.lenght > 12) {
            valid = false;
            this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.')
        }

        return valid;
    }

    validField() {
        let valid = true;

        for(let errorMessage of this.form.querySelectorAll('.error-message')) {
            errorMessage.remove();
        }

        for(let field of this.form.querySelectorAll('.authenticate')) {
            const label = field.previousElementSibling.innerText; 
            
            if(!field.value) {
                this.createError(field, `Campo "${label}" não pode estar em branco.`);
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.validCPF(field)) valid = false;
            }

            if(field.classList.contains('user')) {
                if(!this.validUser(field)) valid = false;
            }
        }

        return valid;

    }

    validUser(field) {
        const user = field.value;
        let valid = true;
        if(user.lenght < 3 || user.lenght > 12){
            this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9] + $/g)){
            this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números.');
            valid = false;
        }

        return true;

    }

    validCPF(field) {
        const cpf = new validCPF(field.value);

        if(!cpf.valid()) {
            this.createError(field, 'CPF inválido.');
            return false;
        }

        return true;
    }
    
    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-message');
        field.insertAdjacentElement('afterend', div);

    }
}

const validate =  new ValidateForm();
