(function() {
  'use strict';
  angular.module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout', '$localForage'];

  function authService($state, angularAuth0, $timeout, $localForage) {
    const vm = this

    vm.userProfile;

    vm.login = login
    vm.handleAuthentication = handleAuthentication
    vm.setSession = setSession
    vm.logout = logout
    vm.isAuthenticated = isAuthenticated
    vm.getProfile = getProfile
    vm.setUserProfile = setUserProfile
    vm.getCachedProfile = getCachedProfile

    function login() {
      console.log('auth service file login')
      angularAuth0.authorize();
    }

    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function() {
            // $state.go('home');
            return
          });
          console.log(err);
          // alert('Error: ' + err.error + '. Check the console for further details.');
        }
      });
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('userEmail');
    }

    function isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      console.log(expiresAt)
      console.log(new Date().getTime() < expiresAt)
      return new Date().getTime() < expiresAt;
    }

    function getProfile(cb) {
      var accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }
      angularAuth0.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          console.log(accessToken)
          setUserProfile(profile);
          vm.userProfile = profile
        }
        cb(err, profile);
      });
    }

    function setUserProfile(profile) {
      vm.userProfile = profile;
      console.log(vm.userProfile)
      console.log(vm.userProfile.email)
      localStorage.setItem('userEmail', vm.userProfile.email)
    }

    function getCachedProfile() {
      console.log('USER PROFILE')
        // console.log(vm.userProfile)
      return vm.userProfile;
    }

  }
})();