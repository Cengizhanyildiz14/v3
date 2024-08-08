export default {
  decodeToken(token) {
    if (!token || token.split('.').length !== 3) {
      throw new Error("Geçersiz veya eksik token.");
    }
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(payload);
    } catch (error) {
      throw new Error("Token çözümleme hatası.");
    }
  },
  getTokenExpirationDate(token) {
    const decoded = this.decodeToken(token);
    if (!decoded.exp) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  },
  isTokenExpired(token) {
    if (!token) {
      return true;
    }
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate === null) {
      return false;
    }
    return expirationDate < new Date();
  },
  getUserRole(token) {
    try {
      const decoded = this.decodeToken(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (error) {
      console.error("Token'dan rol bilgisi çıkarılırken hata: ", error);
      return null;
    }
  },
  getUserFullName(token) {
    const decoded = this.decodeToken(token);
    const fullName = decoded['name'];
    return fullName;
  },

  getUserEmail(token) {
    try {
      const decoded = this.decodeToken(token);
      const email = decoded['email']; 
      return email || 'Email Yok';
    } catch (error) {
      console.error("Token'dan email bilgisi çıkarılırken hata: ", error);
      return 'Email Yok';
    }
  },

  getUserId(token) {

    const decoded = this.decodeToken(token);
    const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return userId

  },
  checkUserStatus() {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      return false;
    }
    try {
      if (this.isTokenExpired(userToken)) {
        localStorage.removeItem('userToken');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
      localStorage.removeItem('userToken');
      return false;
    }
  },
}
