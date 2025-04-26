import bcrypt from "bcrypt";

const formatPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};

export default formatPassword;
