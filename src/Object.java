import java.util.ArrayList;

import processing.core.PGraphics;

/**
 * Objekt
 */
public abstract class Object {
  protected final Vector[] pos;
  protected boolean Static;
  protected int radius;
  
  protected Vector velocity;
  protected Vector force;
  protected Vector acceleration;

  public final int mass = 10;
  protected int color;
  public boolean isStatic = true;
  public boolean move = true;

  ArrayList<Addons> attributes = new ArrayList<Addons>();

  public Object(Vector[] pos, Addons[] addons, int color, boolean Static) {
    this.color = color;
    this.pos = pos;
      velocity = new Vector(0f, 0f);
      acceleration = new Vector(0f,0f);
      force = new Vector(0f,0f);
    this.Static = Static;
      for(int i = 0; i < addons.length; i++) {
        if(addons[i] instanceof Collision) isStatic = false;
        this.attributes.add(addons[i]);
        this.attributes.get(i).setup(this);
      }
  }
  
  public void tick(Object[] objects) {
    if(Static) return;
    updatePos();
    updateAddons(objects);
    velocity.add(acceleration);
    System.out.println(acceleration.getCoords());
  };
  
  // Our current method of updating the posistion of an object
  protected void updatePos() {
    // float Xratio =  velocity.getX() / velocity.length();
    // float Yratio =  velocity.getY() / velocity.length();
    // for(int i = 0; i < velocity.length(); i++) {
    for(Addons addon: attributes) {
      addon.updatePos(this);
    }
    //   if(move) {
    //     addPos(new Vector(Xratio,Yratio));
    //     break;
    //   }
    // }

      force = new Vector(velocity.getX()*mass,velocity.getY()*mass);
      addPos(velocity);
      // System.out.println(pos[0].getCoords());
  }

  protected void updateAddons(Object[] objects) {
    for(Addons addon: attributes) {
      addon.tick(this,objects);
    }
  }

  public int getRadius() {
      return radius;
  }

  public void addPos(float x, float y) {
    for(int i = 0; i < pos.length; i++) {
      pos[i].add(new Vector(x, y));
    }
  }

  public void addPos(Vector vec) {
    for(int i = 0; i < pos.length; i++) {
      pos[i].add(new Vector(vec));
    }
  }

  public abstract void draw(PGraphics g);
}