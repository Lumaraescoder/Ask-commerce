import AdminPageWithAuth from "@/components/Admin/adminLogin";
import router from "next/router";
import React from "react";


const Admin = () => {

  const handleLogout = () => {

    router.push('/login'); // redireciona para a página de login após fazer logout

  };

  return(

    <div>
    <AdminPageWithAuth/>
    </div>

  )

}

export default Admin;


