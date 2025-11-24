import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTasks } from "@/app/actions";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { KanbanWrapper } from "@/components/kanban-wrapper";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const tasks = user ? await getTasks() : [];

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      {!user ? (
        // Landing Page (Logged Out)
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Manage your tasks <br />
            <span className="text-primary">efficiently.</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            The modern task manager you've been waiting for.
            Simple, fast, and built for productivity.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      ) : (
        // Dashboard (Logged In)
        <div className="w-full space-y-8">
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.email}
              </p>
            </div>
            <div className="flex gap-4">
              <CreateTaskDialog />
              <form action={signOut}>
                <Button variant="outline">Sign Out</Button>
              </form>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="p-8 border rounded-lg border-dashed text-center text-muted-foreground">
              No tasks found. Create one to get started!
            </div>
          ) : (
            <KanbanWrapper tasks={tasks} />
          )}
        </div>
      )}
    </div>
  );
}
