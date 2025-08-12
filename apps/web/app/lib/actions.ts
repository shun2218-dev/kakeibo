export async function createUser(formData: FormData) {
  "use server";
  const response = await fetch(process.env.NEXT_API_URL! + "/user", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
}
