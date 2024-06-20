import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export default SignInSchema;
