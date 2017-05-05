User.create({
    first_name: 'Austin',
    last_name: 'Phan',
    email: 'phanphuocdt@gmail.com',
    password: '12345678'
  })


1000.times do |n|
  Post.create({
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraphs,
    user_id: User.find_by_email('phanphuocdt@gmail.com').id
  })
end
