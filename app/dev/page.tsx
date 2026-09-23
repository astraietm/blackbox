// Easter egg: /dev — Secret developer room

export default function DevPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        fontFamily: "'JetBrains Mono', monospace",
        background: "#050810",
        color: "#e6edf3",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div style={{ color: "#00d4ff", fontSize: "0.65rem", letterSpacing: "0.3em", marginBottom: "32px" }}>
        ⚠ RESTRICTED AREA — DEVELOPER TERMINAL
      </div>

      <pre
        style={{
          color: "#8b949e",
          fontSize: "0.8rem",
          lineHeight: 2,
          whiteSpace: "pre-wrap",
        }}
      >
        {`$ whoami
> root (just kidding, you have no privileges here)

$ ls -la /secrets/
> total 0
> drwxr-xr-x  null null  Feb 14  02:13 ./
> drwxr-xr-x  null null  Feb 14  02:13 ../
> ----------  null null     0 Feb 14  02:13 thefile.txt

$ cat thefile.txt
> cat: thefile.txt: Permission denied
> (you didn't think it'd be that easy, did you?)

$ cat /etc/motd
> ================================
>  BLACK BOX ASSOCIATION DEV ROOM
> ================================
>  "We secure things. Sometimes too well."
>  
>  STATUS: All systems operational
>  BUILD:  v1.0.0-investigation
>  
>  KNOWN BUGS:
>  - NULL still hasn't been caught
>  - The file is still missing (sort of)
>  - This terminal is fake
>  
>  DEVELOPER NOTE: If you found this page,
>  you're exactly the kind of person we built
>  this game for. Congrats. No extra points though.
> ================================

$ ./find_null.sh
> Searching for NULL...
> ......searching......
> ..............................
> > NULL is somewhere in the game.
> > Have you looked everywhere yet?

$ exit
> Goodbye. Go find the file.`}
      </pre>

      <div style={{ marginTop: "32px", borderTop: "1px solid #1e2d3d", paddingTop: "24px" }}>
        <div style={{ color: "#4a5568", fontSize: "0.7rem", lineHeight: 2 }}>
          <div>// ACHIEVEMENT UNLOCKED: Ghost Walker</div>
          <div>// You found the developer room.</div>
          <div>// This doesn&apos;t help you solve the mystery.</div>
          <div>// But it proves you look everywhere.</div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <a
          href="/"
          style={{
            color: "#00d4ff",
            textDecoration: "none",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            border: "1px solid #1e2d3d",
            padding: "8px 20px",
            display: "inline-block",
          }}
        >
          ← BACK TO THE GAME
        </a>
      </div>
    </div>
  );
}
