import LoginForm from '@/layouts/LoginForm';
import Link from 'next/link';

let values:string;

const Login = () => {
  
    const formData = new FormData();
    for (let value in formData.values) {
      console.log(value);
      console.log("cheguei");
    }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;