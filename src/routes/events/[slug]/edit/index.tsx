/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { component$, $ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { useDbEventsBySlug } from "./../layout";
import { paths } from "~/utils/paths";
import { type Input, minLength, object, string, boolean, optional, isoDate, number } from 'valibot';
import { type InitialValues, useForm, valiForm$, type SubmitHandler, formAction$, setError } from "@modular-forms/qwik";
import { getSupabaseInstance } from "~/routes/plugin";
 
const LoginSchema = object({
  id: optional(number()),
  title: string([
    minLength(1, 'Please enter an event title'),
  ]),
  description: string([
    minLength(1, 'Please enter an event description.'),
  ]),
  event_location: string([
    minLength(1, 'Please enter an event location.'),
  ]),
  public_listing: boolean(),
  registrations_enabled: boolean(),
  registration_open_date: optional(
    string([
      isoDate("*"),
    ])
  ),
  registration_close_date: optional(string([
    isoDate("*"),
  ])),
});

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(async (requestEvent) => {
  const event = await requestEvent.resolveValue(useDbEventsBySlug);
  return {
    id: event?.id || 0,
    title: event?.title || '',
    description: event?.description || '',
    event_location: event?.event_location || '',
    public_listing: event?.public_listing,
    registrations_enabled: event?.registration_open? true: false,
    registration_open_date: event?.registration_open?.toString().split('T')[0],
    registration_close_date: event?.registration_close?.toString().split('T')[0],
  }
});

export const useFormAction = formAction$<LoginForm>(async(values,requestEvent) => {
  const sb = getSupabaseInstance(requestEvent);
  const userid = (await sb.auth.getUser()).data.user?.id;
  const event = {
    title: values.title,
    description: values.description,
    event_location: values.event_location,
    public_listing: values.public_listing,
    registration_open: values.registration_open_date,
    registration_close: values.registration_close_date,
    owner_id: userid,
  }
  const query = sb.from("events");
  if(values.id){
    const { data, error } = await query.update(event).filter('id','eq',values.id);
    console.log('update event', event, data, error);
  }
  else {
    const slug = values.title.replace(' ','-');
    const { data, error } = await query.insert({slug: slug, ...event}).select()
    console.log('insert event', event, data, error);
    if(data){
      requestEvent.redirect(301,'/events/' + (data ? data[0]?.slug + '/edit':''));
    }
    if(error) {
      requestEvent.redirect(302,`error?code=${error.code}&details=${error.details}`);
    }
  }

  return undefined;
}, valiForm$(LoginSchema));
 
type LoginForm = Input<typeof LoginSchema>;

export default component$(() => {
  const event = useDbEventsBySlug();
  const formAction = useFormAction();
  const [ form , { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    validate: valiForm$(LoginSchema),
  });

  const handleSubmit = $<SubmitHandler<LoginForm>>((values) => {
    if(values.registrations_enabled && (!values.registration_open_date || !values.registration_close_date)){
      form.invalid = true;
      form.touched = true;
      if(!values.registration_open_date){
        setError(form, 'registration_open_date','*', {shouldFocus: true});
        return false;
      }
      if(!values.registration_close_date){
        setError(form, 'registration_close_date','*', {shouldFocus: true});
        return false;
      }
      return false;
    }

    formAction.submit(values).then(res => res);
  });
  return (
    <div class="card">
      {event.value.id > 0 && <>
        <h3>editing event: '{event?.value?.title}'</h3>
        <div>slug: '{event?.value?.slug}'</div>
      </>}
      {!event.value.id && <>
        <h3>new event</h3>
      </>}
      <Form onSubmit$={handleSubmit}>
        <Field name="id" type="number">
          {(field, props) => (
            <input {...props} type="hidden" value={field?.value} />
          )}
        </Field>
        <Field name="title">
          {(field, props) => (
            <div>
              <label>Title</label>
              <input {...props} type="text" value={field.value} />
              {field.error && <div class="error">{field.error}</div>}
              {!field.error && <div class="">&nbsp;</div>}
            </div>
          )}
        </Field>
        <Field name="description">
          {(field, props) => (
            <>
            <label>Description</label>
            <input {...props} type="text" value={field.value} />
            {field.error && <div class="error">{field.error}</div>}
            {!field.error && <div class="">&nbsp;</div>}
            </>
          )}
        </Field>
        <Field name="event_location">
          {(field, props) => (
            <>
            <label>Location</label>
            <input {...props} type="text" value={field.value} />
            {field.error && <div class="error">{field.error}</div>}
            {!field.error && <div class="">&nbsp;</div>}
            </>
          )}
        </Field>
        <Field name="public_listing" type="boolean">
          {(field, props) => (
            <>
              <label>Public Listing Event</label>
              <input {...props} type="checkbox" checked={field.value} />
              </>
          )}
        </Field>
        <Field name="registrations_enabled" type="boolean">
          {(field, props) => (
            <>
              <label>Registrations Enabled</label>
              <input {...props} type="checkbox" checked={field.value} />
              {field.value && <div class="flex gap-2 m-2">
                <Field name="registration_open_date">
                  {(field, props) => (
                    <>
                    <label>Registration Date Open</label>
                    <input {...props} type="date" value={field.value} />
                    {field.error && <div class="error">{field.error}</div>}
                    </>
                  )}
                </Field>
                <Field name="registration_close_date">
                  {(field, props) => (
                    <>
                    <label>Registration Date Close</label>
                    <input {...props} type="date" value={field.value} />
                    {field.error && <div class="error">{field.error}</div>}
                    </>
                  )}
                </Field>
              </div>}
              {!field.value && <div class="flex m-6"></div>}
            </>
          )}
        </Field>
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary">Cancel (todo)</button>
      </Form>
      <div><a href={paths.events} class="btn btn-secondary">back</a></div>
    </div>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      content: "event detail (todo) edit/new",
      name: "description",
    },
  ],
  title: "event title (todo) edit/new",
};
