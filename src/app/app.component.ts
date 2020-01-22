import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('tiles') tiles: QueryList<ElementRef<HTMLElement>>;
  pianoList = [
    {
      title: 'c3',
      path: 'assets/c3.ogg',
      keyCode: 20
    },
    {
      title: 'c-3',
      path: 'assets/c-3.ogg',
      keyCode: 81
    },
    {
      title: 'd3',
      path: 'assets/d3.ogg',
      keyCode: 65
    },
    {
      title: 'd-3',
      path: 'assets/d-3.ogg',
      keyCode: 87
    },
    {
      title: 'e-3',
      path: 'assets/e-3.ogg',
      keyCode: 83
    },
    {
      title: 'f3',
      path: 'assets/f3.ogg',
      keyCode: 68
    },
    {
      title: 'f-3',
      path: 'assets/f-3.ogg',
      keyCode: 82
    },
    {
      title: 'g3',
      path: 'assets/g3.ogg',
      keyCode: 70
    },
    {
      title: 'g-3',
      path: 'assets/g-3.ogg',
      keyCode: 84
    },
    {
      title: 'a3',
      path: 'assets/a3.ogg',
      keyCode: 71
    },
    {
      title: 'a-3',
      path: 'assets/a-3.ogg',
      keyCode: 89
    },
    {
      title: 'b-3',
      path: 'assets/b-3.ogg',
      keyCode: 72
    },
    {
      title: 'c4',
      path: 'assets/c4.ogg',
      keyCode: 74
    },
    {
      title: 'c-4',
      path: 'assets/c-4.ogg',
      keyCode: 73
    },
    {
      title: 'd4',
      path: 'assets/d4.ogg',
      keyCode: 75
    },
    {
      title: 'd-4',
      path: 'assets/d-4.ogg',
      keyCode: 79
    },
    {
      title: 'e-4',
      path: 'assets/e-4.ogg',
      keyCode: 76
    },
    {
      title: 'f4',
      path: 'assets/f4.ogg',
      keyCode: 186
    },
    {
      title: 'f-4',
      path: 'assets/f-4.ogg',
      keyCode: 219
    },
    {
      title: 'g4',
      path: 'assets/g4.ogg',
      keyCode: 222
    },
    {
      title: 'g-4',
      path: 'assets/g-4.ogg',
      keyCode: 221
    },
    {
      title: 'a4',
      path: 'assets/a4.ogg',
      keyCode: 220
    },
    {
      title: 'a-4',
      path: 'assets/a-4.ogg',
      keyCode: 8
    },
    {
      title: 'b-4',
      path: 'assets/b-4.ogg',
      keyCode: 13
    }
  ];

  ngAfterViewInit() {
    const keyDowns$ = fromEvent(document, 'keydown');
    const keyUps$ = fromEvent(document, 'keyup');

    const keypressed$ = keyDowns$.pipe(
      tap((e: KeyboardEvent) => this.playSound(e.keyCode)),
      switchMap(_ => keyUps$.pipe(
        tap((e: KeyboardEvent) => this.stopSound(e.keyCode))
      ))
    );
    
    keypressed$.subscribe();
  }

  playSound(keyCode: number) {
    this.pianoList.forEach((item, itemIndex) => {
      this.tiles.forEach((tile, tileIndex) => {
        if (item.keyCode === keyCode && itemIndex === tileIndex) {
          tile.nativeElement.classList.add('piano__tile_active');
          (tile.nativeElement.children[0] as HTMLAudioElement).play();
        }
      })
    });
  }

  stopSound(keyCode: number) {
    this.pianoList.forEach((item, itemIndex) => {
      this.tiles.forEach((tile, tileIndex) => {
        if (item.keyCode === keyCode && itemIndex === tileIndex) {
          tile.nativeElement.classList.remove('piano__tile_active');
          (tile.nativeElement.children[0] as HTMLAudioElement).load();
        }
      })
    });
  }
}
