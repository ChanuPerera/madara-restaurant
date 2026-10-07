import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Redirecting to Catering Packages | Madara Restaurant Homagama",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://madararestaurant.com/catering/",
  },
};

export default function CateringMenuRedirectPage() {
  redirect("/catering/");
}
