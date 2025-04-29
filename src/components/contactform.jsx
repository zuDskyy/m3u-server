const ContactForm = () => (
  <section className=" py-16 px-6">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded border"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded border"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="p-3 rounded border"
        ></textarea>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
    </div>
  </section>
);

export default ContactForm;
