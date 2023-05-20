<template>
    <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div class="wrapper wrapper--w680">
            <div class="card card-4">
                <div class="card-body">
                    <h2 class="title">Регистрация</h2>

                    <form @submit.prevent="HandleSubmit">
                        <div v-if="exception" class="error-message">
                            {{exception}}
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">first name</label>
                                    <input class="input--style-4" type="text" v-model="firstName" name="firstName" required>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">last name</label>
                                    <input class="input--style-4" type="text" v-model="lastName" name="lastName" required>
                                </div>
                            </div>
                        </div>
                        <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Birthday</label>
                                    <div class="input-group-icon">
                                        <input class="input--style-4 js-datepicker" type="text" v-model="dateOfBirth" name="birthday" required>
                                        <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Email</label>
                                    <input class="input--style-4" type="email" v-model="email" name="email" required>
                                </div>
                            </div>
                        </div>
                        <div class="row row-space">

                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Phone Number</label>
                                    <input class="input--style-4" type="text" v-model="phoneNumber" name="phone" required>
                                </div>
                            </div>

                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Password</label>
                                    <input class="input--style-4" type="password" v-model="password" name="password" required>
                                </div>
                            </div>
                        </div>

                        <div class="p-t-15">
                            <button class="btn btn--radius-2 btn--blue" type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>


<script>

import axios from 'axios'

export default {
        name: 'app',

        data() {
            return {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                dateOfBirth: '',
                password: '',
                exception: ''
            }
        },

        methods: {
            async HandleSubmit() {
                const data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    email: this.email,
                    dateOfBirth: this.dateOfBirth,
                    password: this.password
                }

                try {
                    await axios.post('http://localhost:8080/api/auth/register', data);
                    this.$router.push('/login');
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.exceptionName) {
                        const exceptionName = error.response.data.exceptionName;

                        if (exceptionName === 'UserAlreadyExistsException') {
                            this.exception = "Пользователь с таким email или номером телефона уже существует"
                        }
                    } else if (error.response && error.response.data && error.response.data.violations) {
                        const violations = error.response.data.violations;
                        if (violations.length > 0) {
                            const firstViolation = violations[0];
                            this.exception = firstViolation.message;
                        }
                    } else {
                        this.exception = "Непредвиденная ошибка, попробуйте позже";
                    }
                }
            }
        }
    }

</script>

<style scoped>
    @import "@/assets/registration/vendor/mdi-font/css/material-design-iconic-font.min.css";
    @import "@/assets/registration/vendor/font-awesome-4.7/css/font-awesome.min.css";
    @import "@/assets/registration/vendor/select2/select2.min.css";
    @import "@/assets/registration/css/main.css";

    .error-message {
        background-color: #f2dede;
        color: #a94442;
        padding: 10px;
        text-align: center;
        margin: auto;
        margin-bottom: 50px;
        max-width: 500px;
        border-radius: 5px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    }
</style>




