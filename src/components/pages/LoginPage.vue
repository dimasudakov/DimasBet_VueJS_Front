<template>

    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <form @submit.prevent="HandleSubmit" class="login100-form validate-form">

                    <div>
                        <h1 class="dimasbet-title">DimasBet</h1>
                    </div>

                    <span class="login100-form-title p-b-34 p-t-27">Sign in</span>
                    <div v-if="exception" class="alert alert-danger" role="alert">
                        {{exception}}
                    </div>
                    <div class="wrap-input100">
                        <input class="input100" type="text" v-model="username" name="phone_number" placeholder="Phone number">
                        <span class="focus-input100" data-placeholder="&#xf207;"></span>
                    </div>

                    <div class="wrap-input100">
                        <input class="input100" type="password" v-model="password" name="pass" placeholder="Password">
                        <span class="focus-input100" data-placeholder="&#xf191;"></span>
                    </div>

                    <div class="contact100-form-checkbox">
                        <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
                        <label class="label-checkbox100" for="ckb1">
                            Remember me
                        </label>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn">
                            Login
                        </button>
                    </div>

                    <div class="text-center p-t-90">
                        <a class="txt1" href="/registration">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div id="dropDownSelect1"></div>
</template>

<script>

    import axios from 'axios'
    export default {
        name: 'LoginPage',

        data() {
            return {
                username: '',
                password: '',
                exception: ''
            }
        },

        methods: {
            async HandleSubmit() {
                const data = {
                    username: this.username,
                    password: this.password,
                }

                try {
                    const JwtResponse = await axios.post('http://localhost:8080/api/auth/login', data);

                    this.$store.dispatch('setAccessToken', JwtResponse.data.accessToken);
                    this.$store.dispatch('setRefreshToken', JwtResponse.data.refreshToken);

                    const userResponse = await axios.get('http://localhost:8080/api/user');
                    this.$store.dispatch('user', userResponse.data);

                    this.$router.push('/');
                } catch(ex) {
                    console.error(ex.data)
                    if (ex.response) {
                        const exceptionName = ex.response.data.exceptionName;
                        if(exceptionName === 'UserNotFoundException') {
                            this.exception = "Неправильные имя пользователя или пароль"
                        } else if(exceptionName === 'UserStatusException') {
                            this.exception = "Вы заблокированы за нарушение правил компании, обратитесь в службу поддержки"
                        }
                    } else if (ex.request) {
                        this.exception = 'Сервер недоступен, попробуйте позже';
                    } else {
                        this.exception = 'Произошла ошибка при отправке запроса';
                    }
                }
            }

        }
    }
</script>

<style scoped>

.dimasbet-title {
    color: white;
    text-align: center;
    margin-bottom: 40px;
}

.alert.alert-danger {
    margin-bottom: 30px;
}

</style>

<style scoped src="@/assets/login/vendor/bootstrap/css/bootstrap.min.css"></style>
<style scoped src="@/assets/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
<style scoped src="@/assets/login/fonts/iconic/css/material-design-iconic-font.min.css"></style>
<style scoped src="@/assets/login/vendor/animate/animate.css"></style>
<style scoped src="@/assets/login/vendor/css-hamburgers/hamburgers.min.css"></style>
<style scoped src="@/assets/login/vendor/animsition/css/animsition.min.css"></style>
<style scoped src="@/assets/login/vendor/select2/select2.min.css"></style>
<style scoped src="@/assets/login/vendor/daterangepicker/daterangepicker.css"></style>
<style scoped src="@/assets/login/css/util.css"></style>
<style scoped src="@/assets/login/css/main.css"></style>

