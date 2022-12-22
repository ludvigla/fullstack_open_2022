import Notification from "./Notification"

const LoginForm = ({
    username,
    password,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    errorMessage
   }) => {
   return (
     <div>
       <h2>Login</h2>
       <Notification message={errorMessage} />
 
       <form onSubmit={handleSubmit}>
         <div>
           username
           <input
             type="text"
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm