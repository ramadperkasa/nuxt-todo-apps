<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-col cols="12" sm="8" md="4" style="width: 400px">
      <v-card class="elevation-0 rounded-lg py-10 px-5">
        <v-card-text>
          <div
            class="d-flex flex-column w-100 justify-center items-center mb-5"
          >
            <span class="text-h6 font-weight-bold">Login Form</span>
            <span>Let's get started with your account</span>
          </div>

          <form
            ref="form"
            @submit.prevent="onSubmit"
            class="d-flex flex-column justify-center items-center"
          >
            <v-text-field
              v-model="formData.user_id"
              class="elevation-0 rounded-lg"
              name="username"
              label="Username"
              density="compact"
              type="text"
              flat
              placeholder="username"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              name="password"
              label="Password"
              type="password"
              density="compact"
              flat
              placeholder="password"
              required
            ></v-text-field>

            <div class="d-flex flex-column ga-3">
              <v-btn
                type="submit"
                block
                variant="tonal"
                color="primary"
                value="log in"
                >Login</v-btn
              >

              <div class="d-flex w-100 justify-center">
                <span
                  >Don't have an account?
                  <span
                    @click="goToRegister"
                    class="text-primary cursor-pointer font-weight-bold"
                  >
                    Register Now
                  </span>
                </span>
              </div>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app";

const router = useRouter();

definePageMeta({
  layout: "blank",
});

const formData = ref({
  user_id: "",
  password: "",
});

const isLoading = ref(false);

const onSubmit = async () => {
  try {
    isLoading.value = true;

    const { data, error } = await useFetch("/auth/login", {
      baseURL: "http://localhost:3001/api",
      method: "POST",
      body: formData.value,
    });

    // if (error) {
    //   throw new Error("error.value");
    // }

    const token = data?.value?.data?.token;

    localStorage.setItem("token", token);

    isLoading.value = false;

    router.push("/");
  } catch (error) {
    isLoading.value = false;
    console.error("Login error:", error);
    alert("Login failed. Please check your credentials.");
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style scoped></style>
