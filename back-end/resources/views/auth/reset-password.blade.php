@extends('layout')


@section('content')

<div class="row">
    <div class="col">
      <h1>Password reset</h1>
      <form action="{{ route('password.update') }}" method="POST">
        @csrf
        {{-- @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        @endif --}}
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name='email'>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">New password:</label>
            <input type="password" class="form-control" id="newPassword" aria-describedby="emailHelp" name='password'>
        </div>
        <div class="mb-3">
            <label for="new_password" class="form-label">Repeat new password:</label>
            <input type="password" class="form-control" id="newPasswordRepeat" aria-describedby="emailHelp" name='password_confirmation'>
        </div>
        <div class="mb-3">
            <input type="text" name="token" id="token" value='{{$token}}' hidden>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
@endsection