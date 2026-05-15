// import { useState } from "react";
import Card from "@/src/components/ui/cards";
import FormGroup from "@/src/components/ui/form/form-group";
import TextInput from "@/src/components/ui/form/text-input";
import Label from "@/src/components/ui/form/label";
import ErrorMessage from "@/src/components/ui/form/error";
import Button from "@/src/components/ui/button";
import AuthLayout from "../layout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <section>
        <div>
          <Card>
            <div>
              <h2>Login</h2>
              <p>Silahkan login dengan akun yang terdaftar.</p>
            </div>

            <form action="" method="post">
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <TextInput type="text" id="username" name="username" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <TextInput type="password" id="password" name="password" />
              </FormGroup>
            </form>
          </Card>
        </div>
      </section>
    </AuthLayout>
  );
}
