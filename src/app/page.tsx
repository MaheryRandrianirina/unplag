import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <main>
        <div className="header">
          <h1>Welcome to Unplag !</h1>
          <p>Fight plagiarism easily.</p>
          <p>Unplag is a tool designed to help you detect and prevent plagiarism in your work.</p>
        </div>
        <div className="button-wrapper">
          <button className="button-64" role="button"><span className="text">Upload your file</span></button>
        </div>
      </main>
    </div>
  );
}
