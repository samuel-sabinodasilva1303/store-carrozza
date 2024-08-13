if ($(".paginate").length > 0) {
  let first =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="12" viewBox="0 0 13 12"><path fill="" fill-rule="evenodd" d="M12.28 11.28a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L7.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Zm-6 0a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L1.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>',
    prev =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="7" height="12" viewBox="0 0 7 12"><path fill="" fill-rule="evenodd" d="M6.28 11.28a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 1 1 1.06 1.06L1.81 5.75l4.47 4.47a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd"/></svg>',
    next =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="7" height="12" viewBox="0 0 7 12"><path fill="" fill-rule="evenodd" d="M.47.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06L4.94 6 .47 1.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>',
    last =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="13" height="12" viewBox="0 0 13 12"><path fill="" fill-rule="evenodd" d="M.22.22a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06l4.47-4.47L.22 1.28a.75.75 0 0 1 0-1.06Zm6 0a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06l4.47-4.47-4.47-4.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/></svg>';

  $(".paginate__page--first > a").html(first);
  $(".paginate__page--prev > a").html(prev);
  $(".paginate__page--next > a").html(next);
  $(".paginate__page--last > a").html(last);
}
