<script setup lang="ts"></script>

<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="password_confirm" />
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#register .card {
    max-width: 40vw;
    margin: auto;
}
</style>
