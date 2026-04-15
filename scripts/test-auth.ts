import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAuth() {
  console.log('🔍 Testing authentication...\n');

  // Test 1: Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: 'student@priedu.com' }
  });

  if (!user) {
    console.log('❌ User not found in database');
    return;
  }

  console.log('✅ User found:', {
    email: user.email,
    name: user.name,
    role: user.role,
    hasPassword: !!user.password
  });

  // Test 2: Check password hash
  if (!user.password) {
    console.log('❌ User has no password');
    return;
  }

  console.log('\n🔐 Password hash:', user.password.substring(0, 20) + '...');

  // Test 3: Verify password
  const testPassword = 'password';
  const isValid = await bcrypt.compare(testPassword, user.password);

  console.log('\n🧪 Password verification:');
  console.log('  Input:', testPassword);
  console.log('  Result:', isValid ? '✅ VALID' : '❌ INVALID');

  if (isValid) {
    console.log('\n✨ Authentication should work!');
    console.log('📝 Use these credentials:');
    console.log('   Email: student@priedu.com');
    console.log('   Password: password');
  }
}

testAuth()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
