import { contact } from "@/lib/property";

export function Footer() {
  return (
    <footer className="border-t border-marble bg-ink px-5 py-10 text-sm leading-7 text-mist md:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <p>
          FIFTY TWO - Premises No. 52, Krishna Chandra Dey Sarani, Ward 081,
          Borough X, KMC, Kolkata 700053
        </p>
        <p>
          Architectural consultants: Collage Architects, Kolkata · All dimensions
          and areas as per architectural drawings; super built-up areas
          indicative. Price on request.
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </p>
        <div className="mx-auto h-px w-10 bg-champagne" />
      </div>
    </footer>
  );
}
