import { JwtService } from '@nestjs/jwt';

export function generateToken(data: any) {
  const jwtService = new JwtService();
  const { email, card_number } = data;
  return jwtService.sign(
    { email, card_number },
    {
      secret: process.env.JWT_SECRET,
    },
  );
}
