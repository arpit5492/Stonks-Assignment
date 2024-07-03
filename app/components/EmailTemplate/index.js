import { Html, Button, Tailwind } from "@react-email/components";

export default function EmailTemplate({ userName }) {
  return (
    <Html>
      <Tailwind>
        <p className="font-bold">Welcome to {userName}&apos;s channel</p>
        <Button
          className="p-2 bg-purple-800 rounded-lg text-white cursor-pointer"
          href={`http://localhost:3000/${userName}`}
        >
          View Stream
        </Button>
      </Tailwind>
    </Html>
  );
}
